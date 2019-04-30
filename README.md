## React Infinite Scroll - Intersection Observer

### Installation

`npm i react-infinite-scroll-io`

### How To Use

First import this component where you want to use it

`import InfiniteScroll from "react-infinite-scroll-io"`

Then just render it:

```
<InfiniteScroll
    name="your-list"
    items={users}
    errorMessage="No users found"

    renderCallback={this.renderUser.bind(this)}
    loadMoreCallback={this.props.loadMoreUsers}
    loadMoreParams={['john', 1]}
    spinner={<div class="spinner">Loading...</div>}

    isFetching={this.props.isFetching}
    isLoadingMore={this.props.isLoadingMore}
    isLoadComplete={this.props.isLoadComplete}

    resetStateIfValueChanged={}
/>
```

### Props (all props are required)

| _Prop_                     |     _Description_                             | _Type_                             |
| -------------------------- | :-------------------------------------------: | :--------------------------------: |
| name                       | className of the component                    |      String                        |
| items                      | Array of items to render                      |      Array                         |
| errorMessage               | Message shown if an array is empty            |      String                        |
| maxHeight?                 | Max. height of the scrollable area            |      String                        |
| renderCallback             | Render function for array items               |      Function(returns JSX)         |
| loadMoreCallback           | API call returning items                      |      Function                      |
| loadMoreParams             | Params to pass to a loadMoreCallback          |      Array                         |
| spinner                    | A component that shown while loading          |      JSX                           |
| isFetching                 | Notifies that initial fetching is in progress |      Boolean                       |
| isLoadingMore              | Notifies that loading more is in progress     |      Boolean                       |
| isLoadComplete             | Notifies that loading is complete             |      Boolean                       |
| resetStateIfValueChanged   | A value(s) that reset scroll/page if changed  |      Primitive/Array of primitives |


