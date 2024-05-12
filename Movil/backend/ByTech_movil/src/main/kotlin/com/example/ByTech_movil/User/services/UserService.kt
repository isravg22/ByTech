package com.example.ByTech_movil.User.services

import com.example.ByTech_movil.User.models.UserModel
import com.example.ByTech_movil.User.repositories.IUserRepository
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.stereotype.Service
import java.util.Optional


@Service
class UserService {
    @Autowired
    var userRepository: IUserRepository? = null

    val users: MutableList<UserModel?>?
        get() = userRepository?.findAll()!!

    fun saveUser(user: UserModel?): UserModel {
        return userRepository!!.save(user!!)
    }

    fun getById(id: Long?): Optional<UserModel?> {
        return userRepository!!.findById(id!!)
    }

    fun getUserByCredential(userName: String, password: String): Optional<UserModel?>? {
        return userRepository?.findByUserNameAndPassword(userName, password)
    }

    fun updateByID(request: UserModel, id: Long?): UserModel {
        val userModel: UserModel = userRepository?.findById(id!!)!!.get()

        userModel.firstName=request.firstName
        userModel.lastName=request.lastName
        userModel.email=request.email
        userModel.password=request.password
        userModel.rol=request.rol
        userModel.activated=request.activated
        userModel.userName=request.userName
        userModel.enterprise=request.enterprise

        userRepository!!.save(userModel)

        return userModel
    }

    fun deleteUser(id: Long?): Boolean {
        try {
            if (id != null) {
                userRepository?.deleteById(id)
            }
            return true
        } catch (e: Exception) {
            return false
        }
    }

    fun getByUserName(userName: String?): Optional<UserModel?>? {
        return userRepository?.findByUserName(userName)
    }
}