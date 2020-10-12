package ch.tbz.chat.domain.service.impl;

import java.util.Map;

public class Replacement implements Map.Entry<String, Object> {

    private final String key;
    private final Object value;

    public Replacement(String key, Object value) {
        this.key = key;
        this.value = value;
    }

    @Override
    public String getKey() {
        return key;
    }

    @Override
    public Object getValue() {
        return value;
    }

    @Override
    public Object setValue(Object value) {
        throw new UnsupportedOperationException();
    }
}
