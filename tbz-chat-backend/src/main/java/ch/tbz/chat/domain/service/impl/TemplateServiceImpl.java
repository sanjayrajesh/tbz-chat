package ch.tbz.chat.domain.service.impl;

import ch.tbz.chat.domain.service.TemplateService;
import org.slf4j.Logger;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Paths;
import java.util.Map;

@Service
public class TemplateServiceImpl implements TemplateService {

    private final Logger logger;

    public TemplateServiceImpl(Logger logger) {
        this.logger = logger;
    }

    @SafeVarargs
    @Override
    public final String load(String path, Map.Entry<String, Object>... replacements) {
        try{
            String text = new String(new ClassPathResource(Paths.get(TEMPLATE_DIR, path).toString()).getInputStream().readAllBytes());

            return applyReplacements(text, replacements);
        } catch (IOException e) {
            logger.error("Exception while loading template", e);
            throw new RuntimeException(e);
        }
    }

    private String applyReplacements(String raw, Map.Entry<String, Object>[] replacements) {
        for (Map.Entry<String, Object> replacement : replacements) {
            raw = raw.replaceAll(replacement.getKey(), replacement.getValue().toString());
        }

        return raw;
    }
}
