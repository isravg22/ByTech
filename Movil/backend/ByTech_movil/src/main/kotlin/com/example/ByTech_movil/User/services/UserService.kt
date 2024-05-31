package com.example.ByTech_movil.User.services

import com.example.ByTech_movil.User.models.UserModel
import com.example.ByTech_movil.User.repositories.IUserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.Optional



@Service
class UserService(@Autowired private val userRepository: IUserRepository) {

    val users: List<UserModel>
        get() = userRepository.findAll() as List<UserModel>

    @Throws(Exception::class)
    fun saveUser(user: UserModel): UserModel {
        if (userRepository.existsByUserName(user.userName)) {
            throw Exception("Username already exists")
        }
        if (userRepository.existsByEmail(user.email)) {
            throw Exception("Email already exists")
        }
        return userRepository.save(user)
    }


    fun getById(id: Long): Optional<UserModel?> {
        return userRepository.findById(id)
    }

    fun getUserByCredential(userName: String, password: String): Optional<UserModel?>? {
        return userRepository.findByUserNameAndPassword(userName, password)
    }

    @Throws(Exception::class)
    fun updateByID(request: UserModel, id: Long): UserModel {
        val userModel = userRepository.findById(id).orElseThrow { Exception("User not found") }

        if (userModel!!.userName != request.userName && userRepository.existsByUserName(request.userName)) {
            throw Exception("Username already exists")
        }
        if (userModel!!.email != request.email && userRepository.existsByEmail(request.email)) {
            throw Exception("Email already exists")
        }

        userModel.apply {
            firstName = request.firstName
            lastName = request.lastName
            email = request.email
            password = request.password
            rol = request.rol
            activated = request.activated
            userName = request.userName
            enterprise = request.enterprise
        }

        userRepository.save(userModel)

        return userModel
    }


    fun deleteUser(id: Long): Boolean {
        return try {
            userRepository.deleteById(id)
            true
        } catch (e: Exception) {
            false
        }
    }

    fun getByUserName(userName: String): Optional<UserModel?>? {
        return userRepository.findByUserName(userName)
    }
}
