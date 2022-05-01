import { Box, Button, Flex, Input, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { axios_instance } from "../config"
import Cookies from "universal-cookie"
import { useNavigate } from "react-router-dom"

function Login() {
    const [form, setForm] = useState({
        email: "",
        password: ""
    })
    const navigate = useNavigate()
    const cookies = new Cookies()

    useEffect(() => {
        if (cookies.get("token")) {
            navigate("/dashboard")
        }
    }, [])

    function login() {
        console.log(document.querySelector("meta[property='url']").getAttribute("content"))
        axios_instance.post('/api/login', form).then((res) => {

            cookies.set("token", JSON.stringify(res.data), { path: "/", expires: new Date(Date.now() + 3600 * 1000) })
            navigate("/dashboard")
        }).catch((err) => {
            console.log(err.response)
        })
    }

    return (
        <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
            <Box w={["full", "lg"]} shadow={"dark-lg"} p={5} m={5} rounded={"md"}>
                <Stack spacing={5}>
                    <Text fontWeight={"medium"} fontSize={"3xl"} textAlign={"center"}>Admin</Text>
                    <Input onChange={(ev) => setForm({ ...form, email: ev.target.value })} value={form.email} />
                    <Input onChange={(ev) => setForm({ ...form, password: ev.target.value })} value={form.password} type={"password"} />
                    <Button onClick={login}>Login</Button>
                </Stack>
            </Box>

        </Flex>
    )
}

export default Login
