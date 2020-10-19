import java.io.File;
import java.io.FileInputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Scanner;

public class ConfigureEnv {

  public static void main(String[] args) {

    String envPath = args[0];
    String configPath = args[1];

    try {
      Scanner scanner = new Scanner(new FileInputStream(envPath));
      FileWriter writer = new FileWriter(configPath);

      writer.write("window._env_ = {\n");

      while (scanner.hasNextLine()) {
        String[] split = scanner.nextLine().split("=");

        String key = split[0];

        String value = System.getenv(key);
        if(value == null) {
          value = split[1];
        }

        writer.append(String.format("%s: \"%s\",\n", key, value));
      }

      writer.append("};");

      writer.flush();
      writer.close();
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
