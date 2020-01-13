package spring.boot.singleton.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import spring.boot.singleton.models.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    @Query(value = "select * from users where username = ?1", nativeQuery = true)
    User findByUsername(String username);

    @Query(value = "select * from users where email = ?1", nativeQuery = true)
    User findByEmail(String email);
}
