import * as React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Animated,
} from 'react-native'
import {
  NavigationState,
  Route,
  SceneMap,
  SceneRendererProps,
  TabViewProps,
} from 'react-native-tab-view'
import { HScrollView } from 'react-native-head-tab-view'
import { CollapsibleHeaderTabView } from 'react-native-tab-view-collapsible-header'

const FirstRoute = () => (
  <HScrollView index={0} showsVerticalScrollIndicator={false}>
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
    <View style={[{ backgroundColor: '#ff4081', height: 200 }]} />
    <View style={[{ backgroundColor: '#eaeaea', height: 200 }]} />
  </HScrollView>
)

const SecondRoute = () => (
  <HScrollView index={1} showsVerticalScrollIndicator={false}>
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  </HScrollView>
)

const TRoute = () => (
  <HScrollView index={2} showsVerticalScrollIndicator={false}>
    <View style={[styles.scene, { backgroundColor: '#673ab7' }]} />
  </HScrollView>
)

const initialLayout = { width: Dimensions.get('window').width }

export default function TabViewExample() {
  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'first', title: 'First' },
    { key: 'second', title: 'Second' },
    { key: 't', title: 'Third' },
  ])

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    t: TRoute,
  })

  const widthContent = React.useRef(0)
  const heightItem = React.useRef([])

  const onLayoutWrap = React.useCallback(e => {
    widthContent.current = e.nativeEvent.layout.width
  }, [])
  const onLayoutHeightWrap = React.useCallback(e => {
    heightItem.current = {
      width: e.nativeEvent.layout.width,
      height: e.nativeEvent.layout.height,
    }
  }, [])

  const renderTabBar = (
    props: SceneRendererProps & {
      navigationState: NavigationState<Route>
    },
  ) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)
    const transformCell = props.position.interpolate({
      inputRange,
      outputRange: routes.map(
        (_, i) => (i - 1) * (widthContent.current / routes.length),
      ),
    })

    const styleMarker = {
      margin: 8,
      borderRadius: 40,
      height: heightItem.current?.height,
      position: 'absolute',
      backgroundColor: 'red',
      width: heightItem.current?.width,
      left: `${100 / routes.length}%`,
      transform: [{ translateX: transformCell }],
    }

    return (
      <View style={{ backgroundColor: 'white' }}>
        <View
          style={[
            styles.tabBar,
            // styleMarker,
          ]}
          onLayout={onLayoutWrap}
        >
          <Animated.View style={styleMarker} />
          {props.navigationState.routes.map((route, i) => {
            const opacity = props.position.interpolate({
              inputRange,
              outputRange: inputRange.map(inputIndex =>
                inputIndex === i ? 1 : 0.5,
              ),
            })

            return (
              <TouchableOpacity
                onLayout={onLayoutHeightWrap}
                style={[
                  styles.tabItem,
                  {
                    // backgroundColor: i === index ? 'white' : 'transparent',
                    margin: 8,
                    borderRadius: 99,
                  },
                ]}
                onPress={() => setIndex(i)}
              >
                <Animated.Text style={{ opacity }}>{route.title}</Animated.Text>
              </TouchableOpacity>
            )
          })}
        </View>
      </View>
    )
  }

  return (
    <CollapsibleHeaderTabView
      renderScrollHeader={() => (
        <View style={{ height: 200, backgroundColor: 'red' }} />
      )}
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
    />
  )
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'green',
    margin: 20,
    borderRadius: 99,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
  },
})
