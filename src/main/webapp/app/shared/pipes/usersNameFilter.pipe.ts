import {Pipe,PipeTransform} from '@angular/core';
import {User} from '../../users/user.model';
@Pipe({
    name:'usersFilter'
})
export class UsersFilterNamePipe implements PipeTransform{
    transform(value: User[], args: string[]):User[]{
        let filter: string=args[0]? args[0].toLocaleLowerCase():null;
        return filter?value.filter((users:User)=>users.username.toLocaleLowerCase().indexOf(filter)!=-1):value;
    }
}