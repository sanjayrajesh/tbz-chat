package ch.tbz.chat.domain.datatransfer;

import ch.tbz.chat.domain.model.DomainEntity;

import java.util.Collection;

public class BasicMappingStrategy<DT extends DTO, DE extends DomainEntity> implements MappingStrategy<DT, DE> {

    private final DTOMapper<DT, DE> mapper;

    public BasicMappingStrategy(DTOMapper<DT, DE> mapper) {
        this.mapper = mapper;
    }

    @Override
    public DT map(DE domainEntity) {
        return mapper.dto(domainEntity);
    }

    @Override
    public Collection<? extends DT> map(Collection<DE> domainEntities) {
        return mapper.dto(domainEntities);
    }
}
