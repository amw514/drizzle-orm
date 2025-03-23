import React from 'react'
import { z } from "zod";

const page = () => {




const UserSchema = z.object({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    age: z.number(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

type User = z.infer<typeof UserSchema>

const user: User = {id:"1",name:"john",email:"john@gmail.com",age:20,createdAt:new Date(),updatedAt:new Date()}

console.log('====================================');
console.log(UserSchema.safeParse(user));
console.log('====================================');


  return (
    <div>
        <h1>Zod</h1>
    </div>
  )
}

export default page
