package ch.tbz.chat.domain.datatransfer.message;

import ch.tbz.chat.domain.datatransfer.MappingStrategy;
import ch.tbz.chat.domain.datatransfer.user.UserDTO;
import ch.tbz.chat.domain.model.Message;
import ch.tbz.chat.domain.model.User;

public class WithAuthorStrategy implements MessageMappingStrategy {

  private final MessageMapper mapper;
  private final MappingStrategy<UserDTO, User> userMappingStrategy;

  public WithAuthorStrategy(
      MessageMapper mapper, MappingStrategy<UserDTO, User> userMappingStrategy) {
    this.mapper = mapper;
    this.userMappingStrategy = userMappingStrategy;
  }

  @Override
  public MessageDTO.WithAuthor map(Message message) {
    MessageDTO.WithAuthor dto = mapper.withAuthorDTO(message);
    dto.setAuthor(userMappingStrategy.map(message.getAuthor()));

    return dto;
  }
}
