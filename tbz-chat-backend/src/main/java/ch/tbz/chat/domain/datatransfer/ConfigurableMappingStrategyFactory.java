package ch.tbz.chat.domain.datatransfer;

import ch.tbz.chat.domain.model.DomainEntity;

import java.util.function.UnaryOperator;

public interface ConfigurableMappingStrategyFactory<DT extends DTO, DE extends DomainEntity, C> {

    MappingStrategy<DT, DE> getStrategy(C configuration);

    MappingStrategy<DT, DE> getStrategy(UnaryOperator<C> configuration);

}
