import { useState } from "react";
import NewProject from "./components/NewProject";
import NoProjectSelected from "./components/NoProjectSelected";
import ProjectsSidebar from "./components/ProjectsSidebar";
import SelectedProject from "./components/SelectedProject";

function App() {
	const [projectState, setProjectState] = useState({
		selectedProjectId: undefined,
		projects: []
	})

	function handleStartAddProject() {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectId: null
			}
		})
	}

	function handleAddProject(projectData) {
		setProjectState(prevState => {
			const newProject = {
				...projectData,
				id: Math.random()
			}

			return {
				...prevState,
				selectedProjectId: undefined,
				projects: [...prevState.projects, newProject]
			}
		})
	}

	function handleCancel() {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectId: undefined
			}
		})
	}

	function handleSelectProject(id) {
		setProjectState((prevState) => {
			return {
				...prevState,
				selectedProjectId: id
			}
		})
	}

	const selectedProject = projectState.projects.find(project => project.id === projectState.selectedProjectId)

	let content = <SelectedProject project={selectedProject} />

	if(projectState.selectedProjectId === null ) {
		content = <NewProject onAdd={handleAddProject} onCancel={handleCancel} />
	} else if (projectState.selectedProjectId === undefined) {
		content = <NoProjectSelected onStartAddProject={handleStartAddProject} />
	}

	return (
		<main className="h-screen my-8 flex gap-8">
			<ProjectsSidebar onStartAddProject={handleStartAddProject} projects={projectState.projects} onSelectProject={handleSelectProject} />
			{content}
		</main>
	);
}

export default App;
