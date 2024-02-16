'use client'
import { Flex, Container, Button, Box } from '@mantine/core';
import Image from 'next/image'
import loginButtonCss from './loginButton.module.scss'

const loginTypeList = [
    { content: '네이버 로그인', src: '/icons/naver-icon.svg', bg: '#03CF5D', c: "#FFFFFF" },
    { content: '카카오 로그인', src: '/icons/kakao-icon.svg', bg: '#FEE500', c: "#000000" },
    { content: '구글 로그인', src: '/icons/google-icon.svg', bg: '#FFF', c: "#000000" }
]

type LoginButtonPropsType = {}
const LoginButton = ({ }: LoginButtonPropsType) => {
    return <Flex direction={'column'} gap={16} justify={'center'} align={'center'}>
        {loginTypeList.map(({ content, src, bg, c }) => {
            return <Button classNames={loginButtonCss} bg={bg} c={c} leftSection={<Image src={src} width={40} height={40} alt={'content'} />} >
                {content}
            </Button>
        })}
    </Flex>
}
export default LoginButton;