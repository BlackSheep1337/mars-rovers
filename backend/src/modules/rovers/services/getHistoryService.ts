import User from "../../auth/models/User";
import { RequestError } from "../../../shared/middlewares/errorHandler";

export async function getRoverHistoryService(userId: string | undefined) {
  const user = await User.findById(userId);
  
  if (!user) {
    throw new RequestError('User not found.', 404);
  }

  return user;
}