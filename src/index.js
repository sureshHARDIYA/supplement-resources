/**
 * Build styles
 */
require('./index.css')

/**
 * @class SupplementResources
 * @classdesc Resource Tool for Editor.js
 * @property {ResourceData} data - Resource Tool`s input and output data
 * @property {object} api - Editor.js API instance
 *
 * @typedef {object} ResourceData
 * @description Resource Tool`s input and output data
 * @property {string} title - Resource`s title
 * @property {string} type - Resource's type (Document, Video, Audio, Image)
 * @property {string} message - Resource`s message
 *
 * @typedef {object} ResourceConfig
 * @description Resource Tool`s initial configuration
 * @property {string} titlePlaceholder - placeholder to show in Resource`s title input
 * @property {string} messagePlaceholder - placeholder to show in Resource`s message input
 */
export default class SupplementResources {
  /**
   * Notify core that read-only mode is supported
   */
  static get isReadOnlySupported() {
    return true
  }

  /**
   * Get Toolbox settings
   *
   * @public
   * @returns {string}
   */
  static get toolbox() {
    return {
      icon: 'R',
      title: 'Resource',
    }
  }

  /**
   * Allow to press Enter inside the Resource
   *
   * @public
   * @returns {boolean}
   */
  static get enableLineBreaks() {
    return true
  }

  /**
   * Default placeholder for Resource title
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_TITLE_PLACEHOLDER() {
    return 'Title'
  }

  /**
   * Default placeholder for Resource message
   *
   * @public
   * @returns {string}
   */
  static get DEFAULT_MESSAGE_PLACEHOLDER() {
    return 'Message'
  }

  /**
   * Resource Tool`s styles
   *
   * @returns {object}
   */
  get CSS() {
    return {
      baseClass: this.api.styles.block,
      wrapper: 'cdx-resource',
      title: 'cdx-resource__title',
      input: this.api.styles.input,
      message: 'cdx-resource__message',
    }
  }

  /**
   * Render plugin`s main Element and fill it with saved data
   *
   * @param {ResourceData} data — previously saved data
   * @param {ResourceConfig} config — user config for Tool
   * @param {object} api - Editor.js API
   * @param {boolean} readOnly - read-only mode flag
   */
  constructor({ data, config, api, readOnly }) {
    this.api = api
    this.readOnly = readOnly

    this.titlePlaceholder =
      config.titlePlaceholder || SupplementResources.DEFAULT_TITLE_PLACEHOLDER
    this.messagePlaceholder =
      config.messagePlaceholder || SupplementResources.DEFAULT_MESSAGE_PLACEHOLDER

    this.data = {
      title: data.title || '',
      type: data.type || '',
      message: data.message || '',
    }
  }

  /**
   * Create Resource Tool container with inputs
   *
   * @returns {Element}
   */
  render() {
    const container = this._make('div', [this.CSS.baseClass, this.CSS.wrapper])
    // Create a select input for type
    const typeOptions = ['Document', 'Video', 'Audio', 'Image']
    const typeSelect = this._makeSelect(typeOptions, this.data.type)

    const title = this._make('div', [this.CSS.input, this.CSS.title], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.title,
    })
    const message = this._make('div', [this.CSS.input, this.CSS.message], {
      contentEditable: !this.readOnly,
      innerHTML: this.data.message,
    })

    title.dataset.placeholder = this.titlePlaceholder
    message.dataset.placeholder = this.messagePlaceholder

    container.appendChild(typeSelect)
    container.appendChild(title)
    container.appendChild(message)

    return container
  }

  /**
   * Extract Resource data from Resource Tool element
   *
   * @param {HTMLDivElement} ResourceElement - element to save
   * @returns {ResourceData}
   */
  save(ResourceElement) {
    const typeSelect = ResourceElement.querySelector('select')
    const type = typeSelect.value
    const title = ResourceElement.querySelector(`.${this.CSS.title}`)
    const message = ResourceElement.querySelector(`.${this.CSS.message}`)

    return Object.assign(this.data, {
      type,
      title: title.innerHTML,
      message: message.innerHTML,
    })
  }

  /**
   * Helper for making Elements with attributes
   *
   * @param  {string} tagName           - new Element tag name
   * @param  {Array|string} classNames  - list or name of CSS classname(s)
   * @param  {object} attributes        - any attributes
   * @returns {Element}
   */
  _make(tagName, classNames = null, attributes = {}) {
    const el = document.createElement(tagName)

    if (Array.isArray(classNames)) {
      el.classList.add(...classNames)
    } else if (classNames) {
      el.classList.add(classNames)
    }

    for (const attrName in attributes) {
      el[attrName] = attributes[attrName]
    }

    return el
  }

  _makeSelect(options, selectedOption) {
    const select = this._make('select', [this.CSS.input, this.CSS.title])

    options.forEach((option) => {
      const optionElement = this._make('option')
      optionElement.value = option
      optionElement.text = option
      if (option === selectedOption) {
        optionElement.selected = true
      }
      select.appendChild(optionElement)
    })

    return select
  }

  /**
   * Sanitizer config for Resource Tool saved data
   *
   * @returns {object}
   */
  static get sanitize() {
    return {
      title: {},
      type: {},
      message: {},
    }
  }
}
