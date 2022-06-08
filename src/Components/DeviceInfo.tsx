import React, { memo, useCallback } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native'
import colors from '../Config/colors'
import { DeviceInfoModule } from '../Module'

const DeviceInfo = () => {
  const showDeviceId = useCallback(() => {
    DeviceInfoModule.getDeviceId(deviceId => {
      Alert.alert(`Your device is ${deviceId}`)
    })
  }, [])

  return (
    <View>
      <View style={styles.titleContainer}>
        <Text style={styles.sectionTitle}>Device ID</Text>
      </View>
      <TouchableOpacity onPress={showDeviceId} style={styles.buttonContainer}>
        <Text style={styles.buttonText}>Show Device ID</Text>
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
  buttonContainer: {
    backgroundColor: colors.purple[500],
    padding: 12,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: { fontSize: 16, color: colors.neutral[100] },
})

export default memo(DeviceInfo)
