"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})






type FormType = 'sign-up' | 'sign-in'
const AuthForm = ({type}: {type: FormType}) => {
    const [isLoading, setIsLoading] = useState(false);
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  })

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values)
  }

  return (
    <>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">{type === 'sign-up' ? 'Sign Up' : 'Sign In'}</h1>
        {type === 'sign-up' && (
      <FormField
        control={form.control}
        name="fullname"
        render={({ field }) => (
          <FormItem>
            <div className="shad-form-item">
            <FormLabel className="shad-form-label">Full Name</FormLabel>
            <FormControl>
              <Input placeholder="John Doe" {...field} className="shad-input" />
            </FormControl>

            </div>
            <FormMessage className="shad-form-message"/>
          </FormItem>
        )}
      />
    )}
     <FormField
        control={form.control}
        name="email"
        render={({ field }) => (
          <FormItem>
            <div className="shad-form-item">
            <FormLabel className="shad-form-label">Email</FormLabel>
            <FormControl>
              <Input placeholder="john@example.com" {...field} className="shad-input" />
            </FormControl>

            </div>
            <FormMessage className="shad-form-message"/>
          </FormItem>
        )}
      />
      <Button type="submit" disabled={isLoading} className="form-submit-button">{type === 'sign-up' ? 'Sign Up' : 'Sign In'}
        {isLoading && (
            <Image
            src='/assets/icons/loader.svg'
            alt='loader'
            width={24}
            height={24}
            className="animate-spin ml-2"
            />
        )}

      </Button>

    </form>
  </Form>
    
    </>
  )
}

export default AuthForm