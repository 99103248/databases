package databases.entities;

import lombok.Getter;
import lombok.Setter;
import lombok.experimental.Accessors;

import javax.persistence.*;
import java.util.*;

@Entity
@Getter
@Setter
@Accessors(chain = true)
public class RSO {
    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    private Integer id;

    private String name;

    private String email;

	@ManyToOne
	@JoinColumn(name = "admin_id")
    private Admin admin;

	private String type;

	// rso member list
    @ManyToMany
    @JoinTable(
            name = "rso_users",
            joinColumns = @JoinColumn(name = "rso_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"))
    private Set<User> users;

    public boolean hasMember (User user) {
        return users.contains(user);
    }

    public RSO addUser (User user) {
        if (this.users == null) {
            this.users = new HashSet<User>(){{ add(user); }};
        } else
            this.users.add(user);
        return this;
    }

    public RSO removeUser (User user) {
        if (this.users != null)
            this.users.remove(user);
        return this;
    }
}

