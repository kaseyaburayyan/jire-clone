package com.kaburayyan.comp495.tasktracker.user;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping(path = "/api/v1")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @RequestMapping(path = "/user/login", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody Map<String, Object> credentials){
        String username = (String) credentials.get("username");
        String password = (String) credentials.get("password");

        User user = this.userService.getUserByUsername(username);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        if(!user.getPassword().equals(password)){
            return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
        }

        Map<String, Object> response = new HashMap<>();
        response.put("id", user.getId());
        response.put("username", user.getUsername());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(path = "/user", method = RequestMethod.POST)
    public ResponseEntity<Map<String, Object>> createUser(@RequestBody User user) {
        if (user.getEmail() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (user.getUsername() == null) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        User createUser = this.userService.addUser(user);
        Map<String, Object> response = new HashMap<>();
        response.put("id", createUser.getId());
        response.put("username", createUser.getUsername());

        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @RequestMapping(path = "/user/{id}", method = RequestMethod.GET)
    public ResponseEntity<User> getUserById(@PathVariable UUID id){

        User user = this.userService.getUserById(id);
        if(user == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @RequestMapping(path = "user/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody Map<String, Object> updates){
        
        UUID id = UUID.fromString(updates.get("id").toString());
        String username = (String) updates.get("username");
        String email = (String) updates.get("email");
        String password = (String) updates.get("password"); //this will need to be updated for security purposes
        
        User updatedUser = userService.updateUser(id, username, email, password);
        if (updatedUser == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("id", updatedUser.getId());
        responseBody.put("username", updatedUser.getUsername());

        return new ResponseEntity<>(responseBody, HttpStatus.OK);
    }

    @RequestMapping(path = "user/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Map<String, Object>> deleteUser(@PathVariable UUID id){
       Optional<User> deletedUserOptional = this.userService.deleteUser(id);

        if(deletedUserOptional.isPresent()){
            User deletedUser = deletedUserOptional.get();
            Map<String, Object> responseBody = new HashMap<>();
            responseBody.put("id", deletedUser.getId());
            responseBody.put("username", deletedUser.getUsername());
    
            return new ResponseEntity<>(responseBody, HttpStatus.OK); 
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
      
    }




}
