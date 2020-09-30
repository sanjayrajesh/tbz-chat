package ch.tbz.chat.domain.datatransfer;

import ch.tbz.chat.domain.model.DomainEntity;

import java.util.function.Supplier;
import java.util.function.UnaryOperator;

public abstract class MappingStrategyFactoryAdapter<DT extends DTO, DE extends DomainEntity, C> implements MappingStrategyFactory<DT, DE>, ConfigurableMappingStrategyFactory<DT, DE, C> {

    private final Supplier<C> configurationSupplier;
    protected final MappingStrategy<DT, DE> basicStrategy;

    public MappingStrategyFactoryAdapter(Supplier<C> configurationSupplier, DTOMapper<DT, DE> mapper) {
        this.configurationSupplier = configurationSupplier;
        this.basicStrategy = new BasicMappingStrategy<>(mapper);
    }

    @Override
    public MappingStrategy<DT, DE> getStrategy(UnaryOperator<C> configuration) {
        return getStrategy(configuration.apply(configurationSupplier.get()));
    }

    @Override
    public MappingStrategy<DT, DE> getStrategy() {
        return getStrategy(configurationSupplier.get());
    }
}
