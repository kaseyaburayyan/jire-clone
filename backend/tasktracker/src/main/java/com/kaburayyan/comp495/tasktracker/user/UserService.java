package com.kaburayyan.comp495.tasktracker.user;

import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    private final UserRepository repository;

    @Autowired
    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    public User addUser(User user) {
        this.repository.save(user);
        return user;
    }

    public User getUserById(UUID id){
        Optional<User> user = repository.findById(id);
        return user.orElse(null);
    }

    public User updateUser(UUID id, String username, String email, String password){
        Optional<User> user = repository.findById(id);
        
        if(user.isPresent()){
            //set for existing user, this variable is for readabillity
            User existingUser = user.get();

            existingUser.setUsername(username);
            existingUser.setEmail(email);
            existingUser.setPassword(password);

            return repository.save(existingUser);
        } else {
            return null; //user not found
        }
    }

    public Optional<User> deleteUser(UUID id){
        Optional<User> user = repository.findById(id);
        if(user.isPresent()){
            repository.deleteById(id);
        } 

        return user;
        
    }
}
