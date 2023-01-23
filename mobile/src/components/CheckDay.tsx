import { View, TouchableOpacity, TouchableOpacityProps, Text, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import colors from 'tailwindcss/colors'

const WEEK_DAYS = 7
const SCREEN_HORIZONTAL_PADDING = (32 * 2) / 5

export const DAY_MARGIN_BETWEEN = 8
export const DAY_SIZE = (Dimensions.get('screen').width / WEEK_DAYS) - (SCREEN_HORIZONTAL_PADDING + 5)

interface Props extends TouchableOpacityProps {
    title: string;
    checked?: boolean;
}

export function CheckDay({ title, checked = false, ...rest}: Props) {
    return (
        <TouchableOpacity
            activeOpacity={0.7}
            className="flex-col mb-2 mr-3 items-center"
            {...rest}
        >
            {
                checked
                ?
                <View className="h-8 w-8 bg-violet-500 rounded-lg items-center justify-center">
                    <Feather
                        name="check"
                        size={20}
                        color={colors.white}
                    />
                </View>
                :
                <View className="h-8 w-8 bg-zinc-900 rounded-lg"/>

            }
            <Text className="text-white text-base ml-3 font-semibold">
                {title} 
            </Text>

        </TouchableOpacity>

    )
}

