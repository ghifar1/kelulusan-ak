import { Box, Button, Flex, FormControl, FormLabel, Heading, Icon, Image, Input, InputGroup, InputLeftElement, Stack, Table, TableContainer, Tbody, Td, Text, Thead, Tr } from "@chakra-ui/react"
import logoAK from "../images/logoak-min.png"
import { BsPersonFill } from "react-icons/bs"
import { useEffect, useState } from "react"
import { axios_instance } from "../config"
import Cookies from "universal-cookie"
import moment from "moment"

const BersyaratBox = ({ student }) => {
    return (
        <Box bg={"yellow.400"} rounded={"md"} p={5}>
            <TableContainer>
                <Table size={"sm"}>
                    <Tbody>
                        <Tr>
                            <Td>NISN</Td>
                            <Td>{student.nisn}</Td>
                        </Tr>
                        <Tr>
                            <Td>Nama</Td>
                            <Td>{student.nama}</Td>
                        </Tr>
                        {/* <Tr>
                            <Td>Jenis Kelamin</Td>
                            <Td>{student.kelamin}</Td>
                        </Tr> */}
                        <Tr>
                            <Td>Kelas</Td>
                            <Td>{student.kelas}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Box mt={5} textAlign={"center"}>
                <Text fontWeight={"medium"} fontSize={"xl"}>Anda lulus BERSYARAT</Text>
                <Text fontWeight={"medium"}>{student.deskripsi}</Text>
            </Box>
        </Box>
    )
}

const GagalBox = ({ student }) => {
    return (
        <Box bg={"red.300"} rounded={"md"} p={5}>
            <TableContainer>
                <Table size={"sm"}>
                    <Tbody>
                        <Tr>
                            <Td>NISN</Td>
                            <Td>{student.nisn}</Td>
                        </Tr>
                        <Tr>
                            <Td>Nama</Td>
                            <Td>{student.nama}</Td>
                        </Tr>
                        {/* <Tr>
                            <Td>Jenis Kelamin</Td>
                            <Td>{student.kelamin}</Td>
                        </Tr> */}
                        <Tr>
                            <Td>Kelas</Td>
                            <Td>{student.kelas}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Box mt={5} textAlign={"center"}>
                <Text fontWeight={"medium"} fontSize={"xl"}>Maaf Anda TIDAK LULUS</Text>
                <Text fontWeight={"medium"}>{student.deskripsi}</Text>
            </Box>
        </Box>
    )
}

const LulusBox = ({ student }) => {
    return (
        <Box bg={"whatsapp.400"} rounded={"md"} p={5}>
            <TableContainer>
                <Table size={"sm"}>
                    <Tbody>
                        <Tr>
                            <Td>NISN</Td>
                            <Td>{student.nisn}</Td>
                        </Tr>
                        <Tr>
                            <Td>Nama</Td>
                            <Td>{student.nama}</Td>
                        </Tr>
                        {/* <Tr>
                            <Td>Jenis Kelamin</Td>
                            <Td>{student.kelamin}</Td>
                        </Tr> */}
                        <Tr>
                            <Td>Kelas</Td>
                            <Td>{student.kelas}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </TableContainer>
            <Box mt={5} textAlign={"center"}>
                <Text fontWeight={"bold"} fontSize={"2xl"}>Selamat Anda LULUS</Text>
                <Text fontWeight={"medium"}>{student.deskripsi}</Text>
            </Box>
        </Box>
    )
}

const Welcome = () => {
    const [nisn, setNisn] = useState("")
    const [tanggal, setTanggal] = useState("")
    const [isDisabled, setIsDisabled] = useState(true)
    const [isNotFound, setIsNotFound] = useState(false)
    const [isLoading, setIsloading] = useState(false)
    const [tahunAjar, setTahunAjar] = useState("")
    const [student, setStudent] = useState({})
    const cookies = new Cookies()

    function findStudent() {
        setIsloading(true)
        axios_instance.get(`/api/students/${nisn}`)
            .then((res) => {
                setStudent(res.data)
                if (Object.keys(res.data).length === 0) {
                    setIsNotFound(true)
                } else {
                    setIsNotFound(false)
                }
                setIsloading(false)
            }).catch((err) => {
                console.log(err.response)
            })
    }

    useEffect(() => {
        axios_instance.get("/api/config/buka").then((res) => {
            setTanggal(res.data.tanggal)
            if (moment().isAfter(res.data.tanggal)) {
                setIsDisabled(false)
            }
        })

        axios_instance.get("/api/config/tahun_ajar").then((res) => {
            setTahunAjar(res.data.tanggal)
        })
    }, [])

    return (
        <Flex justifyContent={"center"} alignItems={"center"} h={"100vh"}>
            <Box w={["full", "lg"]} shadow={"dark-lg"} p={5} m={5} rounded={"md"}>
                <Stack spacing={5}>
                    <Stack spacing={7}>
                        <Box textAlign={"center"}>
                            <Flex justifyContent={"center"}>
                                <Image src={logoAK} w={150} />
                            </Flex>
                            <Heading size={"lg"}>Pengumuman Kelulusan <br /> MA Al-Khairiyah</Heading>
                            <Text fontWeight={"medium"}>Tahun ajaran {tahunAjar}</Text>
                        </Box>
                        <InputGroup>
                            <InputLeftElement pointerEvents={"none"} children={<Icon as={BsPersonFill} />} />
                            <Input placeholder="NISN (Nomor Induk Siswa Nasional)" onChange={(ev) => setNisn(ev.target.value)} value={nisn} />
                        </InputGroup>
                        <Button colorScheme={"facebook"} isLoading={isLoading} isDisabled={nisn.length == 0 || isDisabled} onClick={findStudent}>{isDisabled ? `Fitur dibuka pada ${moment(tanggal).locale("id").format('DD MMMM, HH:mm')}` : "Cek Kelulusan"}</Button>
                    </Stack>
                    {Object.keys(student).length !== 0 ? student.status == "lulus" ? <LulusBox student={student} /> : student.status == "tidak lulus" ? <GagalBox student={student} /> : <BersyaratBox student={student} /> : null}
                    {isNotFound && <Box textAlign={"center"}>
                        Mohon maaf NISN tidak ditemukan. Silakan coba lagi.
                    </Box>}
                </Stack>
            </Box>

        </Flex>
    )
}

export default Welcome
