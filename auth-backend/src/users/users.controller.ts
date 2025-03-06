import { Controller , Post , Body,Get , Param, NotFoundException} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

  @Post() // Handle POST requests to /users
  async create(@Body() userData: Partial<User>): Promise<User> {
    return this.usersService.create(userData);
  }

  @Get(':id') // Handle GET requests to /users/:id
  async findOne(@Param('id') id: number): Promise<User> {
    const user = await this.usersService.findOne(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  @Get() // Handle GET requests to /users
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }
}
