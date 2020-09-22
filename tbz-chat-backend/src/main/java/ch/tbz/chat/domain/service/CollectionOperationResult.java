package ch.tbz.chat.domain.service;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class CollectionOperationResult<T> {

    private final Collection<T> successes;
    private final Collection<Error<T>> errors;

    public CollectionOperationResult() {
        this(new ArrayList<>(), new ArrayList<>());
    }

    public CollectionOperationResult(Collection<T> successes, Collection<Error<T>> errors) {
        this.successes = successes;
        this.errors = errors;
    }

    public CollectionOperationResult<T> addSuccess(T success) {
        successes.add(success);
        return this;
    }

    public CollectionOperationResult<T> addError(Error<T> error) {
        errors.add(error);
        return this;
    }

    public static class Error<T> {

        private final T value;
        private final Set<String> messages;

        public Error(T value) {
            this.value = value;
            this.messages = new HashSet<>();
        }

        public Error<T> addMessage(String message) {
            messages.add(message);
            return this;
        }

        public T getValue() {
            return value;
        }

        public Set<String> getMessages() {
            return messages;
        }
    }

}
