import fontawesome from '@fortawesome/fontawesome'

fontawesome.config.autoReplaceSvg = false
fontawesome.config.measurePerformance = true
fontawesome.config.observeMutations = false

// Add used icons here:
import { faUser, faChevronLeft } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faUser)
fontawesome.library.add(faChevronLeft)
