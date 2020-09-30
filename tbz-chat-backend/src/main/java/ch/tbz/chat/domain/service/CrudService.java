package ch.tbz.chat.domain.service;

import ch.tbz.chat.domain.model.DomainEntity;

import java.util.Collection;
import java.util.NoSuchElementException;

public interface CrudService<T extends DomainEntity> {

    Collection<T> findAll();

    T findById(String id) throws NoSuchElementException;

    T create(T entity);

    T save(T entity);

    T updateById(String id, T entity) throws NoSuchElementException;

    void deleteById(String id) throws NoSuchElementException;

}
