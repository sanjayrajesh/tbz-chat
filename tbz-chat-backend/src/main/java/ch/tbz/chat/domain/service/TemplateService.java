package ch.tbz.chat.domain.service;

import java.util.Map;

public interface TemplateService {

    String TEMPLATE_DIR = "templates";

    String load(String path, Map.Entry<String, Object> ...replacements);

}
