import React from 'react'
import {
    DefaultToolbar,
    DrawToolbarItem,
    EraserToolbarItem,
    SelectToolbarItem,
    HandToolbarItem,
    Tldraw,
    exportToBlob,
    useEditor,
    TldrawUiButton,
    DefaultStylePanelContent

} from 'tldraw'
import type { TLComponents, TLUiComponents, TLUiOverrides } from "tldraw"
import "./DrawingEditor.css"

function ExportCanvasButton() {
    const editor = useEditor()
    return (
        <TldrawUiButton
            type="low"
            onClick={async () => {
                const shapeIds = editor.getCurrentPageShapeIds()
                if (shapeIds.size === 0) return alert('No shapes on the canvas')
                const blob = await exportToBlob({
                    editor,
                    ids: [...shapeIds],
                    format: 'png',
                    opts: { background: false },
                })

                const link = document.createElement('a')
                link.href = window.URL.createObjectURL(blob)
                link.download = 'every-shape-on-the-canvas.jpg'
                link.click()
            }}
        >
            Download
        </TldrawUiButton>
    )
}

const uiOverrides: TLUiOverrides = {
    tools(editor, tools) {
        return {
            draw: tools.draw,
            eraser: tools.eraser,
            select: tools.select,
            hand: tools.hand
        }
    },
}


const WhiteBackground = () => {
    return <div style={{ backgroundColor: "white" }} />
}

const components: TLComponents = {
    Toolbar: (props) => {
        return (
            <DefaultToolbar {...props}>
                <DrawToolbarItem />
                <EraserToolbarItem />
                <SelectToolbarItem />
                <HandToolbarItem />
            </DefaultToolbar>
        )
    },
    MainMenu: null,
    PageMenu: null,
    StylePanel: null,
    ActionsMenu: null,
    DebugMenu: null,
    DebugPanel: null,
    SharePanel: ExportCanvasButton,
    Background: WhiteBackground
}


export default function ToolInToolbarExample() {
    return (
        <div className="tldraw__editor"
            style={{ width: "100%", height: "100%" }}
        >
            <Tldraw
                initialState="draw"
                // pass in our custom components
                components={components}
                overrides={uiOverrides}
            // pass in our custom asset urls
            />
        </div>
    )
}
