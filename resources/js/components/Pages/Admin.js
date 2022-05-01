import { Box, Button, Input, Stack, Text, useToast } from "@chakra-ui/react"
import moment from "moment";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import * as XLSX from "xlsx"
import { axios_instance } from "../config";

const columns = [
    {
        name: 'NISN',
        selector: row => row.nisn,
    },
    {
        name: 'Nama',
        selector: row => row.nama,
    },
    {
        name: 'Kelas',
        selector: row => row.kelas,
    },
];

const data = [
    {
        id: 1,
        title: 'Beetlejuice',
        year: '1988',
    },
    {
        id: 2,
        title: 'Ghostbusters',
        year: '1984',
    },
]

const Admin = () => {
    const cookies = new Cookies()
    const navigate = useNavigate()
    const [students, setStudents] = useState([])
    const [tanggal, setTanggal] = useState("")
    const [tahun_ajar, setTahunAjar] = useState("")
    const toast = useToast()

    useEffect(() => {
        if (!cookies.get("token")) {
            return navigate("/logins")
        }

        axios_instance.get("/api/students", {
            headers: {
                "Authorization": `Bearer ${cookies.get("token").access_token}`
            }
        }).then((res) => {
            setStudents(res.data)
        })

        axios_instance.get("/api/config/buka", {
            headers: {
                "Authorization": `Bearer ${cookies.get("token").access_token}`
            }
        }).then((res) => {
            console.log(res.data)
            setTanggal(res.data.tanggal)
        })

        axios_instance.get("/api/config/tahun_ajar", {
            headers: {
                "Authorization": `Bearer ${cookies.get("token").access_token}`
            }
        }).then((res) => {
            console.log(res.data)
            setTahunAjar(res.data.tanggal)
        })

    }, [])

    function logout() {
        cookies.remove("token")
        navigate("/login")
    }

    function saveTahunAjar() {
        axios_instance.post("/api/config", {
            nama: "tahun_ajar",
            tanggal: tahun_ajar
        }, {
            headers: {
                "Authorization": `Bearer ${cookies.get("token").access_token}`
            }
        }).then((res) => {
            console.log(res)
            toast({
                title: "Berhasil",
                description: "Berhasil menyimpan config",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        })
    }

    function saveConfig() {
        axios_instance.post("/api/config", {
            nama: "buka",
            tanggal: tanggal
        }, {
            headers: {
                "Authorization": `Bearer ${cookies.get("token").access_token}`
            }
        }).then((res) => {
            console.log(res)
            toast({
                title: "Berhasil",
                description: "Berhasil menyimpan config",
                status: "success",
                duration: 5000,
                isClosable: true
            })
        })
    }

    function readFile(e) {
        const [file] = e.target.files;
        const reader = new FileReader();

        reader.onload = async (evt) => {
            const bstr = evt.target.result;
            const wb = XLSX.read(bstr, { type: "binary" });
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            console.log(ws)
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });


            for (const [i, row] of data.entries()) {
                if (i == 0) {
                    continue
                }
                const res = await axios_instance.post("/api/students", {
                    "nisn": row[0],
                    "nama": row[1],
                    "kelamin": row[2],
                    "kelas": row[3],
                    "status": row[4],
                    "deskripsi": row[5],
                    "tahun_ajaran": row[6],
                }, {
                    headers: {
                        "Authorization": "Bearer " + cookies.get("token").access_token
                    }
                })

                console.log(row)

                toast({
                    title: "Berhasil",
                    description: "Berhasil menambahkan siswa",
                    status: "success",
                    duration: 5000,
                    isClosable: true
                })

                // console.log(res)
            }
            console.log(data);
        };

        reader.readAsBinaryString(file);
    }

    return (
        <Stack justifyContent={"center"} p={5}>
            <Box>
                <Button onClick={logout}>Logout</Button>
            </Box>
            <Box maxW={"5xl"} p={5} bg={"facebook.400"} textColor={"white"} rounded={"md"}>
                <Stack>
                    <Text fontWeight={"medium"}>Upload file</Text>
                    <Input type={"file"} onChange={readFile} />
                </Stack>
            </Box>
            <Box maxW={"5xl"} p={5} bg={"facebook.400"} textColor={"white"} rounded={"md"}>
                <Stack>
                    <Text fontWeight={"medium"}>Tanggal Dibuka</Text>
                    <Input type={"datetime-local"} value={tanggal} onChange={(e) => setTanggal(e.target.value)} />
                    <Button colorScheme={"facebook"} onClick={saveConfig}>Simpan</Button>
                </Stack>
            </Box>
            <Box maxW={"5xl"} p={5} bg={"facebook.400"} textColor={"white"} rounded={"md"}>
                <Stack>
                    <Text fontWeight={"medium"}>Tahun Ajaran</Text>
                    <Input type={"text"} value={tahun_ajar} onChange={(e) => setTahunAjar(e.target.value)} />
                    <Button colorScheme={"facebook"} onClick={saveTahunAjar}>Simpan</Button>
                </Stack>
            </Box>
            <Box maxW={"5xl"} p={5} bg={"facebook.400"} textColor={"white"} rounded={"md"}>
                <Stack>
                    <Text fontWeight={"medium"}>List Data</Text>
                    <DataTable columns={columns} data={students} pagination />
                </Stack>
            </Box>
        </Stack>
    )
}

export default Admin
