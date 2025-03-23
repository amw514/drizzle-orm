import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'


const UserFormSchema = z.object({
    name: z.string().min(1),
    email: z.string().email(),
    age: z.number().min(18),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
});

type User = z.infer<typeof UserFormSchema>





const Page = () => {

    const form = useForm<User>({
        resolver: zodResolver(UserFormSchema),
    })


    const handleSubmit = (data: User) => {
        const result = UserFormSchema.safeParse(data)
        if(result.success){
            console.log(result.data)
        }else{
            console.log(result.error)
        }
    }




  return (
    <div>
      <h1>React Form Zod</h1>
    </div>
  )
}

export default Page
