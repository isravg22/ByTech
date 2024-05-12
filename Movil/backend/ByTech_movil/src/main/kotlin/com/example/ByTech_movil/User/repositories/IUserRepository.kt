package com.example.ByTech_movil.User.repositories

import com.example.ByTech_movil.User.models.UserModel
import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository
import java.util.Optional

@Repository
interface IUserRepository : JpaRepository<UserModel?, Long?> {
    fun findByUserNameAndPassword(userName: String?, password: String?): Optional<UserModel?>?
    fun findByUserName(userName: String?): Optional<UserModel?>?
}
