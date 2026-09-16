package com.auth;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
public class MainController {
    @GetMapping("public")
    public String homePage(@RequestParam String param) {
        return "Hello Authentication";
    }

    @GetMapping("/private")
    public String privateRoute() {
        return "Private Route";
    }
}
