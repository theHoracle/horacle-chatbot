<script setup>
import {Card, CardHeader, CardDescription, CardTitle, CardContent} from "@/components/ui/card"
import {Button} from '@/components/ui/button';

definePageMeta({
    auth: { unauthenticatedOnly: true, navigateAuthenticatedTo: '/chat' }
})

const {signIn, status} = useAuth()


</script>


<template>
    <div class="grid h-screen place-items-center">
        <Card class="w-full max-w-sm">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to use the app</CardDescription>
            </CardHeader>
            <CardContent class="flex flex-col gap-4">
                <Button
                @click="signIn"
                >Login with Google</Button>
                <p class='text-sm text-center'>You are currently {{ status }}</p>
            </CardContent>
        </Card>
    </div>
</template>