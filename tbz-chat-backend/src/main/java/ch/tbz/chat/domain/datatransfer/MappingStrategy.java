package ch.tbz.chat.domain.datatransfer;

import ch.tbz.chat.domain.model.DomainEntity;

import java.util.Collection;
import java.util.stream.Collectors;

public interface MappingStrategy<DT extends DTO, DE extends DomainEntity> {

    DT map(DE domainEntity);

    default Collection<? extends DT> map(Collection<DE> domainEntities) {
        return domainEntities.stream().map(this::map).collect(Collectors.toSet());
    }

}
