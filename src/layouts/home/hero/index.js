import {
  Container,
  Stack,
  Flex,
  Box,
  Heading,
  Text,
  Button,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BlockChain from "../../../assets/hero-illustration/blockchain";
import useMineFunctions from "../../../hooks/useMineFunctions";
import useWalletData from "../../../hooks/useWalletData";

export default function Hero() {
  const { active, unsupportedChain } = useWalletData();
  const { guessUserType } = useMineFunctions();
  const [user, setUser] = useState("");

  useEffect(() => {
    guessUserType().then(type => setUser(type));
  }, [guessUserType]);

  return (
    <Container maxW={"7xl"} mb={"10em"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 10 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: "30%",
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Vender tus bienes
            </Text>
            <br />
            <Text as={"span"} color={"blue.400"}>
              sin salir de casa
            </Text>
          </Heading>
          <Text color={"gray.500"}>
            Compra y vende muebles más rápido, <br />
            más seguro y sin depender de nadie
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", sm: "row" }}
          >
            <CallToActions active={active} isDisabledChain={unsupportedChain} userType={user} />
          </Stack>
        </Stack>
        <Flex
          flex={1}
          justify={"center"}
          align={"center"}
          position={"relative"}
          w={"full"}
        >
          <Blob
            w={"150%"}
            h={"150%"}
            position={"absolute"}
            top={"-20%"}
            left={0}
            zIndex={-1}
            color={useColorModeValue("blue.50", "blue.400")}
          />

          <Box position={"relative"} width={"full"}>
            <BlockChain />
          </Box>
        </Flex>
      </Stack>
    </Container>
  );
}

export const Blob = props => {
  return (
    <Icon
      width={"100%"}
      viewBox="0 0 578 440"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M239.184 439.443c-55.13-5.419-110.241-21.365-151.074-58.767C42.307 338.722-7.478 282.729.938 221.217c8.433-61.644 78.896-91.048 126.871-130.712 34.337-28.388 70.198-51.348 112.004-66.78C282.34 8.024 325.382-3.369 370.518.904c54.019 5.115 112.774 10.886 150.881 49.482 39.916 40.427 49.421 100.753 53.385 157.402 4.13 59.015 11.255 128.44-30.444 170.44-41.383 41.683-111.6 19.106-169.213 30.663-46.68 9.364-88.56 35.21-135.943 30.551z"
        fill="currentColor"
      />
    </Icon>
  );
};


const CallToActions = ({userType}) => {
  const { connect, unsupportedChain, active } = useWalletData()

  const connectWallet = useCallback(() => {
    if (!active && !unsupportedChain) connect()
  }, [connect, unsupportedChain, active])

  if (!active || unsupportedChain) {
    return (
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        onClick={connectWallet}
        px={6}
        variant={unsupportedChain ? "ghost" : "outline"}
        colorScheme={unsupportedChain ? "gray" : "green"}
        disabled={unsupportedChain}
        isDisabled={unsupportedChain}
      >
       {unsupportedChain ? 'Red no soportada' : 'Conecta tu wallet'}
      </Button>
    )
  }

  if (userType === '') {
    return (<>
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        as={Link}
        to={ "/user"}
        px={6}
        colorScheme={"blue"}
        bg={"blue.400"}
        _hover={{ bg: "blue.500" }}
      >
        Registrate aquí
      </Button>
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        as={Link}
        to={"/certifier"}
        px={6}
        variant="outline"
        colorScheme={"blue"}
        _hover={{ bg: "blue.500", color: "white" }}
      >
        Soy perito
      </Button>
    </>)
  }

  if (userType === 'certifier') {
    return (
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        as={Link}
        to={ "/bienes"}
        px={6}
        colorScheme={"blue"}
        bg={"blue.400"}
        _hover={{ bg: "blue.500" }}
      >
        Empieza a certificar
      </Button>
    )
  }

  if (userType === 'user') {
    return (
      <Button
        rounded={"full"}
        size={"lg"}
        fontWeight={"normal"}
        as={Link}
        to={ "/bienes"}
        px={6}
        colorScheme={"blue"}
        bg={"blue.400"}
        _hover={{ bg: "blue.500" }}
      >
        Compra y vende
      </Button>
    )
  }
}