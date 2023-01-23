import { useState } from 'react'
import { Alert, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

import { BackButton } from '../components/BackButton'
import { CheckDay } from '../components/CheckDay'
import { api } from "../lib/axios";

const availableWeekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']

export function New() {
    const [weekDays, setWeekDays] = useState<number[]>([])
    const [title, setTitle] = useState('');

    function handleToggleWeekDay(weekDayIndex: number) {
        if(weekDays.includes(weekDayIndex)) {
            setWeekDays(prevState => prevState.filter(weekDay => weekDay !== weekDayIndex))
        }
        else {
            setWeekDays(prevState => [...prevState, weekDayIndex]);
        }
    }

    
    async function handleCreateNewHabit() {
        try {
            if (!title.trim() || weekDays.length === 0) {
                return Alert.alert('Novo hábito', 'Informe o nome do hábito e escolha a periodicidade.')
            }

        await api.post('/habits', { title, weekDays })

        setTitle('');
        setWeekDays([]);

        Alert.alert('Novo hábito', 'Hábito criado com sucesso!');
        } catch (error) {
        console.log(error)
        Alert.alert('Ops', 'Não foi possível criar o novo hábito')
        }
    }

    return (
        <View className="flex-1 bg-background px-8 pt-16">
            <ScrollView showsVerticalScrollIndicator={false}>

                <BackButton/>

                <Text className="mt-6 text-white font-extrabold text-3xl">
                    Criar Hábito
                </Text>

                <Text className="mt-6 text-white font-semibold text-base">
                    Qual o seu comprometimento
                </Text>

                <TextInput
                    className="h-12 pl-4 rounded-lg mt-3 bg-zinc-800 text-white focus:border-2 focus:border-zinc-500"
                    placeholder="ex.: Exercícios, dormir bem, etc..."
                    placeholderTextColor={colors.zinc[400]}
                    onChangeText={setTitle}
                    value={title}
                />
                <Text className="font-semibold mt-4 mb-3 text-white text-bold">
                    Qual a recorrência?
                </Text>
                <View className="flex-row mt-3">
                    {
                        availableWeekDays.map((weekDay, index) => (
                            <CheckDay
                                key={`${weekDay}-${index}`} 
                                title={weekDay}
                                checked={weekDays.includes(index)}
                                onPress={() => handleToggleWeekDay(index)}                           
                            />
                        ))
                    }
                </View>
                <TouchableOpacity
                    className="w-full h-14 flex-row items-center justify-center bg-violet-600 rounded-md mt-6"
                    activeOpacity={0.7}
                    onPress={handleCreateNewHabit}
                >
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />

                    <Text className="font-semibold text-base text-white ml-2">
                        Confirmar
                    </Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}