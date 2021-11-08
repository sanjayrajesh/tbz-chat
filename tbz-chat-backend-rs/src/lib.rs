pub mod chat;
pub mod message;
pub mod role;
pub mod user;
pub mod user_in_chat;
pub mod verification_token;
pub mod error;
pub mod mail;
pub mod invitation;

#[cfg(test)]
mod test {
    use bcrypt::{verify};

    #[test]
    fn verifies_hash_generated_by_spring() {
        let hashed = "$2a$10$L714YQTSEMZoW6MVnZ1Od.XsLA0T/Q8kkFAxpNH2wOKx3sXefh7hu";

        let is_valid = verify("12345",hashed).unwrap();

        assert!(is_valid);
    }

}