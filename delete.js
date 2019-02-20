render() {
    return this.data.modules.map((modules, column_index) => {

        return (
            <div column_index={column_index}>
                Column: {column_index}
                {
                    Object.keys(modules).map((module_key, module_index) => {
                        return (
                            <div module_index={module_index}>
                                {module_key}: {modules[module_key].type}
                                {
                                    modules[module_key].items.map((item, item_index) => {
                                        return(
                                            <div item_index={item_index}>
                                                {item.headline}
                                            </div>
                                        )
                                    })                                        
                                }
                            </div>

                        )
                    })
                }
            </div>
        )

    })
}