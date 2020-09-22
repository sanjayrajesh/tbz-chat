package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.model.DomainEntity;
import ch.tbz.chat.domain.repository.DomainEntityRepository;
import ch.tbz.chat.domain.service.CrudService;

import java.util.Collection;
import java.util.NoSuchElementException;
import java.util.Optional;

public abstract class CrudServiceImpl<T extends DomainEntity> implements CrudService<T> {

    protected final DomainEntityRepository<T> repository;

    public CrudServiceImpl(DomainEntityRepository<T> repository) {
        this.repository = repository;
    }

    @Override
    public final Collection<T> findAll() {
        return queryFindAll();
    }

    protected Collection<T> queryFindAll() {
        return repository.findAll();
    }

    @Override
    public final T findById(String id) throws NoSuchElementException {
        Optional<T> optional = queryFindById(id);

        if (optional.isPresent()) {
            return optional.get();
        } else {
            throw new NoSuchElementException(id);
        }
    }

    protected Optional<T> queryFindById(String id) {
        return repository.findById(id);
    }

    @Override
    public final T create(T entity) {
        return postCreate(doCreate(preCreate(entity)));
    }

    protected T preCreate(T entity) {
        return entity;
    }

    private T doCreate(T entity) {
        entity.setId(null);
        return repository.save(entity);
    }

    protected T postCreate(T entity) {
        return entity;
    }

    @Override
    public final T updateById(String id, T entity) throws NoSuchElementException {
        T oldEntity = findById(id);

        return postUpdate(
                doUpdate(
                        id,
                        preUpdate(
                                entity,
                                oldEntity
                        )
                ),
                oldEntity
        );
    }

    protected T preUpdate(T newEntity, T oldEntity) {
        return newEntity;
    }

    private T doUpdate(String id, T newEntity) {
        newEntity.setId(id);

        return repository.save(newEntity);
    }

    protected T postUpdate(T newEntity, T oldEntity) {
        return newEntity;
    }

    @Override
    public final void deleteById(String id) throws NoSuchElementException {

    }
}
