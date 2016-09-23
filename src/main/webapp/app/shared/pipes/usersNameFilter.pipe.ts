import {Pipe,PipeTransform} from '@angular/core';
import {Users} from '../../users/users.model';
@Pipe({
    name:'usersFilter'
})
export class UsersFilterNamePipe implements PipeTransform{
    transform(value: Users[], args: string[]):Users[]{
        let filter: string=args[0]? args[0].toLocaleLowerCase():null;
        return filter?value.filter((users:Users)=>users.username.toLocaleLowerCase().indexOf(filter)!=-1):value;
    }
}