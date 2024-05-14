package com.example.ByTech_movil.User.controllers

import com.example.ByTech_movil.User.models.UserModel
import com.example.ByTech_movil.User.services.UserService
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.Optional

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = ["exp://192.168.0.247:8081"])
class UserController(private val userService: UserService) {

    @GetMapping
    fun getUsers(): List<UserModel?>? = userService.users

    @PostMapping("/insertUser")
    fun saveUser(@RequestBody user: UserModel): UserModel = userService.saveUser(user)

    @GetMapping("/{id}")
    fun getUserById(@PathVariable("id") id: Long): Optional<UserModel?> = userService.getById(id)

    @PostMapping("/login")
    fun login(@RequestBody userModel: UserModel): ResponseEntity<UserModel> {
        if(userModel.userName == null || userModel.password == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build()
        }

        val userOptional = userService.getUserByCredential(userModel.userName!!, userModel.password!!)
        return if (userOptional!!.isPresent) {
            ResponseEntity.ok(userOptional.get())
        } else {
            ResponseEntity.status(HttpStatus.UNAUTHORIZED).build()
        }
    }


    @PutMapping("/{id}")
    fun updateUserById(@RequestBody request: UserModel, @PathVariable("id") id: Long): UserModel =
        userService.updateByID(request, id)

    @DeleteMapping("/{id}")
    fun deleteUserById(@PathVariable("id") id: Long): String {
        val ok: Boolean = userService.deleteUser(id)
        return if (ok) {
            "User with id $id deleted!"
        } else {
            "Error, we have a problem and can't delete user with id $id"
        }
    }
}
