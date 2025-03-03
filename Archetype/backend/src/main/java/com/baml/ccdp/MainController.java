package com.baml.ccdp;

import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;

import java.io.BufferedReader;
import java.io.File;
import java.io.InputStreamReader;
import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class MainController {

    @PostMapping("/createProjectFromArchetype")
    public String createProjectFromArchetype(@RequestBody Map<String, String> requestBody) {
        try {
            String groupId = requestBody.get("groupId");
            String artifactId = requestBody.get("artifactId");
            String version = requestBody.get("projectVersion");
            String archetypeGroupId = "org.apache.maven.archetypes";
            String archetypeArtifactId = "maven-archetype-quickstart";
            String archetypeVersion = "1.4";

            String userHome = System.getProperty("user.home");
            String desktopDir = userHome + File.separator + "Desktop";

            if (groupId == null || artifactId == null || version == null) {
                return "Missing required parameters in request body";
            }

            ProcessBuilder processBuilder = new ProcessBuilder(
                    "mvn", "archetype:generate",
                    "-DgroupId=" + groupId,
                    "-DartifactId=" + artifactId,
                    "-Dversion=" + version,
                    "-DarchetypeGroupId=" + "org.apache.maven.archetypes",
                    "-DarchetypeArtifactId=" + "maven-archetype-quickstart",
                    "-DarchetypeVersion=" + "1.4",
                    "-DinteractiveMode=false"
            );

            processBuilder.directory(new File(desktopDir));
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                System.out.println(line);
            }

            BufferedReader errorReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));
            while ((line = errorReader.readLine()) != null) {
                System.err.println(line);
            }
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                return "Project created successfully";
            } else {
                return "Project creation failed";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error during project creation: " + e.getMessage();
        }
    }

}


