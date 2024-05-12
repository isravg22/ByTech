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
@CrossOrigin(origins = ["http://localhost:3000", "http://localhost:3001"])
class UserController {
    @Autowired
    private val userService: UserService? = null

    @get:GetMapping
    val users: MutableList<UserModel?>?
        get() = userService?.users

    @PostMapping(path = ["/insertUser"])
    fun saveUser(@RequestBody user: UserModel?): UserModel {
        return userService!!.saveUser(user)
    }

    @GetMapping(path = ["/{id}"])
    fun getUserById(@PathVariable("id") id: Long?): Optional<UserModel?> {
        return userService!!.getById(id)
    }

    @PostMapping("/login")
    fun login(@RequestBody userModel: UserModel): ResponseEntity<UserModel> {
        val userOptional: Optional<UserModel?>? =
            userService?.getUserByCredential(userModel.userName!!, userModel.password!!)
        if (userOptional != null) {
            return if (userOptional.isPresent()) {
                ResponseEntity.ok<UserModel>(userOptional.get())
            } else {
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).build<UserModel>()
            }
        }
        return TODO("Provide the return value")
    }


    @PutMapping(path = ["{id}"])
    fun updateUserById(@RequestBody request: UserModel?, @PathVariable("id") id: Long?): UserModel {
        return userService!!.updateByID(request!!, id)
    }

    @DeleteMapping(path = ["/{id}"])
    fun deleteUserById(@PathVariable("id") id: Long): String {
        val ok: Boolean = userService!!.deleteUser(id)
        return if (ok) {
            "User with id $id delete!"
        } else {
            "Error, we have a problem and can´t delete user with id $id"
        }
    }
}
