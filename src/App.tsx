import { Image, ImageSourcePropType, Pressable, StatusBar, StyleSheet, Text, TouchableOpacity, View ,Vibration, Animated} from 'react-native'
import { PropsWithChildren, useRef, useState } from 'react'
import React from 'react'

// import images
import DiceOne from "../assets/One.png"
import DiceTwo from "../assets/Two.png"
import DiceThree from "../assets/Three.png"
import DiceFour from "../assets/Four.png"
import DiceFive from "../assets/Five.png"
import DiceSix from "../assets/Six.png"

type DiceProps = PropsWithChildren<{
  imageUrl:ImageSourcePropType
}>

let startAnimation = () => {}
let dir = true
const Dice = ({imageUrl}:DiceProps):JSX.Element => {
  const animation = useRef(new Animated.Value(0)).current
  startAnimation = () => {
    Animated.spring(animation,{
      toValue:dir?1:0,
      useNativeDriver:true,
      friction:2,
      tension:200,
   
    }).start()
  }
  return (
    <Animated.View  style={
      {
        transform:[
          { perspective: 1000 },
          {
            translateY:animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,-100]
            })
          
          },

         { 
            translateX:animation.interpolate({
            inputRange:[0,1],
            outputRange:[0,0]
            })
         },
         { 
            rotate:animation.interpolate({
            inputRange:[0,1],
            outputRange:["0deg","360deg"]
            })
         }
      ]
      }
    } >
      <Image style={styles.diceImage} source={imageUrl} />
    </Animated.View>
  )
}
export default function App():JSX.Element {
  const [diceImage,setDiceImage] = useState<ImageSourcePropType>(DiceOne)

  const rollDiceOnTap = () => {
    let randomNumber = Math.floor(Math.random() * 7)

    switch (randomNumber) {
      case 1:
        setDiceImage(DiceOne)
        break;
      case 2:
        setDiceImage(DiceTwo)
        break;
      case 3:
        setDiceImage(DiceThree)
        break;
      case 4:
        setDiceImage(DiceFour)
        break;
      case 5:
        setDiceImage(DiceFive)
        break;
      case 6:
        setDiceImage(DiceSix)
        break;

      default:
        setDiceImage(DiceOne)
        break;
    }

    Vibration.vibrate(50);

  }


  return (
    <>
    <StatusBar backgroundColor={'#E5E0FF'}/>
    <View style={styles.container}>
      <Dice imageUrl={diceImage} />
      <TouchableOpacity onPress={() => {rollDiceOnTap();startAnimation();dir=!dir}}>
        <Text style={styles.rollDiceBtnText}>
          Roll The Dice
        </Text>
      </TouchableOpacity>
    </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF2F2',
    gap:30
  },
  diceContainer: {
    margin: 12,
  },
  diceImage: {
    width: 200,
    height: 200,
  },
  rollDiceBtnText: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderWidth: 2,
    borderRadius: 8,
    borderColor: '#E5E0FF',
    fontSize: 16,
    color: '#8EA7E9',
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});