import { IuserRepository } from "../../domain/repositories/IUserRepository";
import { User } from "../../domain/entities/User";
import bcrypt from 'bcrypt';

export class InMemoryUserRepository implements IuserRepository {
    private users: User[] = [];

    constructor() {
        this.initializeUsers();
    }

    private async initializeUsers() {
        await this.addUser('leon', 'leon12345');
        await this.addUser('gaby', 'gabi12345');
    }

    async addUser(username: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(Date.now().toString(), username, hashedPassword);
        this.users.push(newUser);
        return newUser;
    }

    async findByUsername(username: string): Promise<User | null> {
        return this.users.find(user => user.username === username) || null;   
    }
}