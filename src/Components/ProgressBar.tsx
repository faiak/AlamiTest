import React, { memo, useCallback, useEffect, useMemo, useRef } from 'react'
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import colors from '../Config/colors'

const ProgressBar = () => {
  const barWidth = useRef(new Animated.Value(0)).current
  const barWidthNumber = useRef(0)
  const progressPercent = barWidth.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
  })

  const startAnimation = useCallback(() => {
    Animated.timing(barWidth, {
      duration: 10000 - barWidthNumber.current * 100,
      toValue: 100,
      useNativeDriver: false,
    }).start(o => {
      if (o.finished) {
        barWidth.setValue(0)
        startAnimation()
      }
    })
  }, [barWidthNumber])

  const stopAnimation = useCallback(() => {
    barWidth.stopAnimation()
  }, [])

  useEffect(() => {
    barWidth.addListener(value => {
      barWidthNumber.current = value.value
    })
    startAnimation()
  }, [])

  const progressBarAnimatedStyle = useMemo(
    () => [
      {
        backgroundColor: colors.purple[500],
        height: 16,
        width: progressPercent,
      },
    ],
    [],
  )

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Progress Bar</Text>
      </View>

      <View style={styles.progressBarContainer}>
        <Animated.View style={progressBarAnimatedStyle} />
      </View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPressIn={stopAnimation}
        onPressOut={startAnimation}
        style={styles.progressBarButton}
      >
        <Text style={styles.progressBarButtonText}>
          Hold here to stop progress
        </Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  titleContainer: {
    paddingBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
  },
  progressBarContainer: {
    backgroundColor: colors.neutral[300],
    flex: 1,
    height: 16,
  },
  progressBarButton: {
    marginTop: 16,
    backgroundColor: colors.yellow[500],
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 20,
  },
  progressBarButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.neutral[600],
  },
})

export default memo(ProgressBar)
