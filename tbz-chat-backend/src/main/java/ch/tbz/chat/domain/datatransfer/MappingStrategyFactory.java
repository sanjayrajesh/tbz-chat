package ch.tbz.chat.domain.datatransfer;

import ch.tbz.chat.domain.model.DomainEntity;

public interface MappingStrategyFactory<DT extends DTO, DE extends DomainEntity> {

    MappingStrategy<DT, DE> getStrategy();

}
