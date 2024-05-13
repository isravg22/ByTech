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

    fun saveUser(user: UserModel): UserModel {
        return userRepository.save(user)
    }

    fun getById(id: Long): Optional<UserModel?> {
        return userRepository.findById(id)
    }

    fun getUserByCredential(userName: String, password: String): Optional<UserModel?>? {
        return userRepository.findByUserNameAndPassword(userName, password)
    }

    fun updateByID(request: UserModel, id: Long): UserModel {
        return userRepository.findById(id).map { userModel ->
            userModel.apply {
                this?.firstName = request.firstName
                this?.lastName = request.lastName
                this?.email = request.email
                this?.password = request.password
                this?.rol = request.rol
                this?.activated = request.activated
                this?.userName = request.userName
                this?.enterprise = request.enterprise
            }
        }.map { userRepository.save(it!!) }.orElseThrow { RuntimeException("User not found with id $id") }
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
