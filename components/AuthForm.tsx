"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { createAccount } from "@/lib/actions/user.actions"

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

const authFormSchema = (formType: FormType) =>{
     return z.object({
       email: z.string().email(),
       fullName: formType === 'sign-up' ? z.string().min(2,).max(50) : z.string().optional()
     })
}




type FormType = 'sign-up' | 'sign-in'
const AuthForm = ({type}: {type: FormType}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>("");
    const [accountId, setAccountId] = useState(null);
    const formSchema = authFormSchema(type);
      // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "", email: ""
    },
  })

  // 2. Define a submit handler.
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const user = createAccount({fullName: values.fullName || "", email: values.email});
      setAccountId(user.accountId);
    } catch {
      setError("Failed to create account. Please try again.");
    }finally{
      setIsLoading(false);
    }
  }

  return (
    <>
    <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">{type === 'sign-up' ? 'Sign Up' : 'Sign In'}</h1>
        {type === 'sign-up' && (
      <FormField
        control={form.control}
        name="fullName"
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
      {error && (
        <p className="error-message">*{error}</p>
      )}
       <div className="body-2 flex justify-center">
        <p className="text-light-100">{type === "sign-up" ? "Already have an account? " : "Don't have an account? "}</p>
        <Link href={type === "sign-up" ? "/sign-in" : "/sign-up"} className="ml-1 font-medium text-brand">
        {type === "sign-up" ? "Sign In" : "Sign Up"}
        </Link>

       </div>
    </form>
  </Form>
    
    </>
  )
}

export default AuthForm