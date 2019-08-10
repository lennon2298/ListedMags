import React from 'react';
import {
    View,
    Text,
} from 'react-native';

import {
    Card,
    CardItem,
    Thumbnail,
} from 'native-base';

export default class Cards extends React.PureComponent {
    render() {
        <Card style={{ margin: "5%" }}>
            <CardItem>
                <Thumbnail square large source={{ uri: data.item.post_img }} />
                {/*console.log(id.toString())*/}
                {/* {console.log(typeof(this.props.article.post_img))}
                    {console.log(this.props.article.post_img.toString())}
                    {console.log(this.props.article.title.toString())}
                    {console.log(this.props.article.post_cat.toString())} */}
                <View style={{ marginHorizontal: "5%", }}>
                    <Text style={{ fontWeight: "700", fontSize: 22, }}>
                        {/* {console.log(this.props.article.title)} */}
                        {console.log(data.item.title)}
                        {data.item.title}
                    </Text>
                    <Text >
                        {console.log(data.item.post_cat)}
                        {data.item.post_cat}
                    </Text>
                </View>
            </CardItem>
        </Card>
    }
}
